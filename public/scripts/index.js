// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => {
    preParent.classList.remove('flashing');
  }, 300);
}

function showResponse(response) {
  response.json().then(data => {
    showObject({
      data,
      status: response.status,
      statusText: response.statusText
    });
  });
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 *
 * Native browser Fetch API documentation to fetch resources: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'anon-toggle': nighthawkModeToggle,
  'sign-in': signIn,
  'sign-out': signOut,
  'view-all-freets': viewAllFreets,
  'view-freets-by-author': viewFreetsByAuthor,
  'view-freets-by-author-on-this-day': viewFreetsByAuthorOnThisDay,
  'view-important-freets': viewImportantFreets,
  'seen-freets-by-user': viewSeenFreets,
  'following-freets-for-user': viewFollowingFreets,
  'get-shortened-post': getShortenedPost,
  'create-freet': createFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
  'add-follower':addFollower,
  'remove-follower':removeFollower,
  'add-seen-post':addSeenFreet,
  'remove-seen-post':removeSeenFreet,
  'change-reputation':changeReputation,
  'upvote-post':upvotePost,
  'view-all-comments':viewAllComments,
  'view-comments-by-author':viewCommentsByAuthor,
  'view-important-comments':viewImportantComments,
  'upvote-comment':upvoteComment,
  'create-comment':createComment,
  'edit-comment': editComment,
  'delete-comment': deleteComment,
  'freet-comments':freetComments
};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(form);
      handler(Object.fromEntries(formData.entries()));
      return false; // Don't reload page
    };
  });
}

// Attach handlers once DOM is ready
window.onload = init;
