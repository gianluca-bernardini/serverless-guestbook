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
    return $.ajax({
      type: 'PUT',
      url: `${apiUrl}/records`,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        first,
        last,
        phone,
        emei,
        lat,
        long,
        comment,
      }),
      dataType: 'json',
    });
  }
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
