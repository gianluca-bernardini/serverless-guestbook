/**
 * Web application
 */
const apiUrl = 'https://0b18a19c.us-south.apigw.appdomain.cloud/nocovid';
const guestbook = {
  // retrieve the existing guestbook entries
  get() {
    return $.ajax({
      type: 'GET',
      url: `${apiUrl}/records`,
      dataType: 'json'
    });
  },
  // add a single guestbood entry
  add(first, last, phone, emei, lat,long, comment) {
    console.log('Sending', first, last, phone, emei, lat, long, comment)
    var jsonString = JSON.stringify({
      "dbname": "nocovid",
      "first": first,
      "last": last,
      "phone": phone,
      "emei": emei,
      "lat":lat,
      "long": long,
      "comment": comment,
    });
    console.log(jsonString);

    return $.ajax({
      type: 'PUT',
      url: `${apiUrl}/records`,
      contentType: 'application/json; charset=utf-8',
      data: jsonString,
      dataType: 'json',
    });
  },
  // deletes a single guestbood entry
  remove(id, revision) {
    console.log('removing ', id, revision)
    var jsonString = JSON.stringify({
      "dbname": "nocovid",
      "docid": id,
      "docrev": revision
    });
    console.log(jsonString);

    return $.ajax({
      type: 'DELETE',
      url: `${apiUrl}/records`,
      contentType: 'application/json; charset=utf-8',
      data: jsonString,
      dataType: 'json',
    });
  }
};

// intercept the click on the delete button, removes the guestbook entry and
// reload entries on success  
function deleteRecord() {

    guestbook.remove(
      $('#docid').val().trim(),
      $('#docrev').val().trim()
    ).done(function(result) {
      // reload entries
      loadEntries();
    }).error(function(error) {
      console.log(error);
    });
  };

(function() {

  let entriesTemplate;

  function prepareTemplates() {
    entriesTemplate = Handlebars.compile($('#entries-template').html());
  }

  // retrieve entries and update the UI
  function loadEntries() {
    console.log('Loading entries...');
    $('#entries').html('Loading entries...');
    guestbook.get().done(function(result) {
      if (!result.entries) {
        return;
      }

      const context = {
        entries: result.entries
      }
      $('#entries').html(entriesTemplate(context));
    }).error(function(error) {
      $('#entries').html('No entries');
      console.log(error);
    });
  }

  // intercept the click on the submit button, add the guestbook entry and
  // reload entries on success
  $(document).on('submit', '#addEntry', function(e) {
    e.preventDefault();

    guestbook.add(
      $('#first').val().trim(),
      $('#last').val().trim(),
      $('#phone').val().trim(),
      $('#emei').val().trim(),
      $('#lat').val().trim(),
      $('#long').val().trim(),
      $('#comment').val().trim()
    ).done(function(result) {
      // reload entries
      loadEntries();
    }).error(function(error) {
      console.log(error);
    });
  });

  $(document).ready(function() {
    prepareTemplates();
    loadEntries();
  });
})();
