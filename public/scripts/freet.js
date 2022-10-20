/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllFreets(fields) {
  fetch('/api/freets')
    .then(showResponse)
    .catch(showResponse);
}

function viewFreetsByAuthor(fields) {
  fetch(`/api/freets?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewFreetsByAuthorOnThisDay(fields) {
  fetch(`/api/freets/date?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewImportantFreets(fields) {
  fetch(`/api/freets/important?user=${fields.user}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewSeenFreets(fields) {
  fetch(`/api/freets/seen?user=${fields.user}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewFollowingFreets(fields) {
  fetch(`/api/freets/following?user=${fields.user}`)
    .then(showResponse)
    .catch(showResponse);
}

function createFreet(fields) {
  fetch('/api/freets', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
