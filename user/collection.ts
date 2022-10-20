import type {HydratedDocument, Types} from 'mongoose';
import type {User} from './model';
import UserModel from './model';

/**
 * This file contains a class with functionality to interact with users stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<User> is the output of the UserModel() constructor,
 * and contains all the information in User. https://mongoosejs.com/docs/typescript.html
 */
class UserCollection {
  /**
   * Add a new user
   *
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @return {Promise<HydratedDocument<User>>} - The newly created user
   */
  static async addOne(username: string, password: string): Promise<HydratedDocument<User>> {
    const dateJoined = new Date();
    const seen:Array<any> = [];
    const following:Array<any> = [];
    const user = new UserModel({username, password, dateJoined, seen, following});
    await user.save(); // Saves user to MongoDB
    return user;
  }

  /**
   * Find a user by userId.
   *
   * @param {string} userId - The userId of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({_id: userId});
  }

  /**
   * Find a user by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
  }

  // none of these have been added to other files. just keeping them here for future work.

  /**
   * Add a freet to the seen list.
   *
   * @param {string} username - The username of the user 
   * @param {string} freetId - The freet to add to the seen list // is this even a string?
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
   static async addToSeenList(username: string, freetId: Types.ObjectId | string): Promise<HydratedDocument<User>> {
    const user =  await UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
    if (user.seen.includes(freetId) == false) user.seen.push(freetId);
    return user;
  }

  /**
   * Remove a freet from the seen list.
   *
   * @param {string} username - The username of the user
   * @param {string} freetId - The freet to remove from the seen list // is this even a string?
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
   static async removeFromSeenList(username: string, freetId: Types.ObjectId | string): Promise<HydratedDocument<User>> {
    const user =  await UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
    if (user.seen.includes(freetId) == true) 
    {
      const ix = user.seen.indexOf(freetId);
      user.seen.splice(ix, 1);
    }
    return user;
  }

  /**
   * Add a freeter to the user's following list.
   * 
   * @param {string} username - The username of the user
   * @param {string} toFollow - The username of the user to add to the following list
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
   static async addToFollowList(username: string, toFollow: string): Promise<HydratedDocument<User>> {
    const user =  await UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
    if (user.following.includes(toFollow) == false) user.following.push(toFollow);
    return user;
  }

  /**
   * Add a freeter to the user's following list.
   * 
   * @param {string} username - The username of the user
   * @param {string} toRemove - The username of the user to remove from the following list
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
   static async removeFromFollowList(username: string, toRemove: string): Promise<HydratedDocument<User>> {
    const user =  await UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
    if (user.following.includes(toRemove) == true) 
    {
      const ix = user.following.indexOf(toRemove);
      user.following.splice(ix, 1);
    }
    return user;
  }

  /**
   * Find a user by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @param {string} password - The password of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsernameAndPassword(username: string, password: string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({
      username: new RegExp(`^${username.trim()}$`, 'i'),
      password
    });
  }

  /**
   * Update user's information
   *
   * @param {string} userId - The userId of the user to update
   * @param {Object} userDetails - An object with the user's updated credentials
   * @return {Promise<HydratedDocument<User>>} - The updated user
   */
  static async updateOne(userId: Types.ObjectId | string, userDetails: any): Promise<HydratedDocument<User>> {
    const user = await UserModel.findOne({_id: userId});
    if (userDetails.password) {
      user.password = userDetails.password as string;
    }

    if (userDetails.username) {
      user.username = userDetails.username as string;
    }

    await user.save();
    return user;
  }

  /**
   * Delete a user from the collection.
   *
   * @param {string} userId - The userId of user to delete
   * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
   */
  static async deleteOne(userId: Types.ObjectId | string): Promise<boolean> {
    const user = await UserModel.deleteOne({_id: userId});
    return user !== null;
  }
}

export default UserCollection;
