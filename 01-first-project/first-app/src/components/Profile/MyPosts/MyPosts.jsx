import React from 'react';
import stylesMyPosts from './MyPosts.module.css';
import Post from '../MyPosts/Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../Common/FormsControls/FormsControls';

const maxLength140 = maxLengthCreator(140);

const MyPosts = React.memo(props => {
  let postElement = [...props.posts].map((post) => <Post profile={props.profile} message={post.message} key={post.id} likes={post.likes} ></Post>);
  
  let onAddPost = (values) => {
    props.addPost(values.newPost);
  }

  return (
      <div className={stylesMyPosts.posts}>
        <div className={stylesMyPosts.title}>My posts</div>
        <PostReduxForm onSubmit={onAddPost} />
        { postElement }
      </div>
  )
})

const PostForm = (props) => {
  return(
    <form onSubmit={props.handleSubmit}>
      <div className={stylesMyPosts.new}>
          <Field component={Textarea} name="newPost" placeholder='My new post is about...' validate={[required, maxLength140]}></Field>
          <button>Add Post</button>
        </div>
    </form>
  )
}

const PostReduxForm = reduxForm({ form: 'postForm' })(PostForm);

export default MyPosts;