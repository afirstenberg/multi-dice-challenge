const Multivocal = require('multivocal');
const Firestore = require('@google-cloud/firestore');
let db;

const path = '/leaderboard';

function buildSlots(){
  console.log('building leaderboard');
  for( let co=60; co>=10; co-- ){
    let data = {
      score: co,
      count: 0
  };
    db.collection( path ).doc( `${co}` ).set( data );
  }
}

function rankInfo( score ){
  const leaderboard = db.collection( path );
  return leaderboard.orderBy('score','desc').endAt( score ).get()
    .then( snapshot => {
      let ret = {
        rank: 1,
        peer: 0
      };

      snapshot.forEach( doc => {
        let data = doc.data();
        let docScore = data.score;
        let docCount = data.count;
        if( docScore === score ){
          ret.peer = docCount - 1;
        } else {
          ret.rank += docCount;
        }
      });

      return Promise.resolve( ret );
    })
}

function leaderboardFromScore( env, highScore ){
  return rankInfo( highScore )
    .then( info => {
      env.leaderboard = info;
      return Promise.resolve( env );
    });
}

function buildLeaderboard( env ){
  let highScore = env.highScore;

  // If the user doesn't have a high score, we can't set the rank
  if( highScore ){
    return leaderboardFromScore( env, highScore );
  }

  return Promise.resolve( env );
}

function changeHighScore( env, scoreDec, scoreInc ){

  let batch = db.batch();

  if( scoreDec ){
    const pathDec = `${path}/${scoreDec}`;
    const refDec = db.doc(pathDec);
    batch.update( refDec, {count:Firestore.FieldValue.increment(-1)} );
  }

  if( scoreInc ){
    const pathInc = `${path}/${scoreInc}`;
    const refInc = db.doc(pathInc);
    batch.update( refInc, {count:Firestore.FieldValue.increment(1)} );
  }

  return batch.commit()
    .then( () => {
      return leaderboardFromScore( env, scoreInc );
    })

}
exports.changeHighScore = changeHighScore;

exports.init = function(){

  Multivocal.addBuilder( buildLeaderboard );

  let fsConfig = new Multivocal.Config.Firestore();
  db = fsConfig.db;
};