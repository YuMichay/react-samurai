import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
  posts: [
    { id: 1, message: "Hiiiii!", likes: 4 },
    { id: 2, message: "...Ughhhh...", likes: 2 },
  ]
}

it ('length of posts should be incremented', () => {
  let action = addPostActionCreator("Bye");
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(3);
})

it ('message of new post should be correct', () => {
  let action = addPostActionCreator("Bye");
  let newState = profileReducer(state, action);
  expect(newState.posts[2].message).toBe("Bye");
})

it ('length of posts after deleating should be decrement', () => {
  let action = deletePost(2);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(1);
})

it ('length of posts after deleating should not be decrement with incorrect id', () => {
  let action = deletePost(1000);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(2);
})