async function createPostHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard/new');
}

document.querySelector('#create-post-btn').addEventListener('click', createPostHandler);