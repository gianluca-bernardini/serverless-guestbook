/**
 * Ensures the next call to *list-documents* in the sequence will include the actual documents
 */
 function main(params) {
   return {
     dbname: "nocovid",
     params: {
       include_docs: true
     }
   };
 }
