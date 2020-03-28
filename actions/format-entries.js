/**
 * Format the Cloudant documents to be consumed by the user interface
 */
const md5 = require('spark-md5');

function main(params) {
  var data = params.params;
  if (data === undefined) {
      data = params;
  }
  return {
    entries: data.rows.map((row) => { return {
      first: row.doc.first,
      last: row.doc.last,
      phone: row.doc.phone,
      emei: row.doc.emei,
      lat: row.doc.lat,
      long: row.doc.long,
      comment: row.doc.comment,
      createdAt: row.doc.createdAt,
      icon: null
    }})
  };
};
