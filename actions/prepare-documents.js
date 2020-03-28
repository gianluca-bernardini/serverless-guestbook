/**
 * Prepare the nocovid entry to be persisted
 */
function main(params) {
  if (!params.first || !params.comment) {
    return Promise.reject({ error: 'no name or comment'});
  }

  return {
    dbname: params.dbname,
    doc: {
       createdAt: new Date(),
       first: params.name,
       last: params.last,
       phone: params.phone,
       emei: params.emei,
       lat: params.lat,
       long: params.long,
       comment: params.comment
    }
  };
}
