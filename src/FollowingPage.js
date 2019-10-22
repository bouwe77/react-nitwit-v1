import React from "react";
import axios from "axios";

import settings from "./settings";
import UserList from "./following/UserList";

export default class FollowingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = () => {
    axios
      .get(settings.followingUrl)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(error => {
        console.log(error, error.request, error.response, error.config);
      });
  };

  // Toggles the following status for the given user.
  toggleFollowing = username => {
    // Remember the users before the toggle is applied
    const previousUsers = this.state.users;

    // Determine which user is being toggled.
    const foundUser = this.state.users.find(u => u.user === username);

    // Update the local state first (i.e. optimistic updates).
    const users = this.state.users.map(user => {
      if (user.user === username) {
        return {
          ...user,
          youAreFollowing: !user.youAreFollowing
        };
      }
      return user;
    });

    this.setState({ users });

    // Post the new following status to the API.
    const unfollow = foundUser.youAreFollowing;
    if (unfollow) {
      const url = `${settings.followingUrl}/${username}`;
      // Unfollow means a DELETE call to the API.
      axios.delete(url).catch(error => {
        console.log(error, error.request, error.response, error.config);
        // The API call failed so restore the original state.
        this.setState({ users: previousUsers });
      });
    } else {
      const data = { user: username };
      // Follow means a POST to the API.
      axios.post(settings.followingUrl, data).catch(error => {
        console.log(error, error.request, error.response, error.config);
        // The API call failed so restore the original state.
        this.setState({ users: previousUsers });
      });
    }
  };

  render() {
    return (
      <>
        <UserList users={this.state.users} toggleFollowing={this.toggleFollowing} />
      </>
    );
  }
}
