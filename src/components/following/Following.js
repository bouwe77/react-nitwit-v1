import React from "react";

import settings from "../../settings";
import UserList from "./UserList";
import { getFollowing } from "../../api/getFollowing";
import { saveUnfollow } from "../../api/saveUnfollow";
import { saveFollow } from "../../api/saveFollow";

export default class Following extends React.Component {
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
    getFollowing(settings.user)
      .then(result => {
        this.setState({ users: result });
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

    // Save the new following status to the API.
    const unfollow = foundUser.youAreFollowing;
    if (unfollow) {
      // Unfollow means a DELETE call to the API.
      saveUnfollow(settings.user, username).catch(error => {
        console.log(error, error.request, error.response, error.config);
        // The API call failed so restore the original state.
        this.setState({ users: previousUsers });
      });
    } else {
      const data = { user: username };
      // Follow means a POST to the API.
      saveFollow(settings.user, data).catch(error => {
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
