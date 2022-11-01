/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

 function viewAllComments(fields) {
    fetch('/api/comments')
      .then(showResponse)
      .catch(showResponse);
  }
  
  function viewCommentsByAuthor(fields) {
    fetch(`/api/comments?author=${fields.author}`)
      .then(showResponse)
      .catch(showResponse);
  }
  
  function viewImportantComments(fields) {
    fetch(`/api/comments/important?user=${fields.user}`)
      .then(showResponse)
      .catch(showResponse);
  }

  function freetComments(fields) {
    fetch(`/api/comments/freets?freet=${fields.id}`)
      .then(showResponse)
      .catch(showResponse);
  }

  function createComment(fields) {
    fetch(`/api/comments/${fields.id}?`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function editComment(fields) {
    fetch(`/api/comments/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function deleteComment(fields) {
    fetch(`/api/comments/${fields.id}`, {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function upvoteComment(fields) {
    fetch(`/api/comments/react/${fields.id}/${fields.react}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }