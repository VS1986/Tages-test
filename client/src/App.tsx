import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App(): JSX.Element {
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        const {users, posts} = response.data
        setAllUsers(users);
        setAllPosts(posts);
      } catch (error) {
        console.error(error)
      }
    };
    getData();
  }, []);

  const getFinalData = (allUsers, allPosts)  => {
    return allUsers.map((user) => {
      const slicedUser = { ...user };
      delete slicedUser.phone;
      delete slicedUser.username;

      const address = `${user.address.city}, ${user.address.street}, ${user.address.suite}`;
      const website = `https://${user.website}`;
      const company = user.company.name;

      const posts = allPosts.filter((post) => post.userId === user.id)
      .map((post) => {
        const slicedPost = { ...post };
        delete slicedPost.userId;

        return {
          ...slicedPost,
          title_crop:
            post.title.length > 20
              ? `${post.title.slice(0, 20)}...`
              : post.title,
        };
      });

      return {
        ...slicedUser,
        address,
        website,
        company,
        posts,
      };
    });
  };

  console.log('mixed', getFinalData(allUsers, allPosts));
  const finalUsers = getFinalData(allUsers, allPosts);

  return (
    <>
      <div>
        <ul>
          {finalUsers.map((user, index) => (
            <span key={index} style={{ color: 'white', display: 'flex', flexDirection: 'column' }}>
              {user.name} works in {user.company}
            </span>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
