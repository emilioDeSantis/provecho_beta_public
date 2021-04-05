/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChef = /* GraphQL */ `
  query GetChef($id: ID!) {
    getChef(id: $id) {
      id
      username
      createdAt
      lastUploadDate
      name
      image
      biography
      n_followers
      n_following
      n_remakes
      updatedAt
    }
  }
`;
export const listChefs = /* GraphQL */ `
  query ListChefs(
    $filter: ModelChefFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChefs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        createdAt
        lastUploadDate
        name
        image
        biography
        n_followers
        n_following
        n_remakes
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFollow = /* GraphQL */ `
  query GetFollow($followerID: ID!, $idolID: ID!) {
    getFollow(followerID: $followerID, idolID: $idolID) {
      type
      followerID
      idolID
      follower {
        id
        username
        createdAt
        lastUploadDate
        name
        image
        biography
        n_followers
        n_following
        n_remakes
        updatedAt
      }
      idol {
        id
        username
        createdAt
        lastUploadDate
        name
        image
        biography
        n_followers
        n_following
        n_remakes
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFollows = /* GraphQL */ `
  query ListFollows(
    $followerID: ID
    $idolID: ModelIDKeyConditionInput
    $filter: ModelFollowFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFollows(
      followerID: $followerID
      idolID: $idolID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        type
        followerID
        idolID
        follower {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        idol {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      createdAt
      type
      text
      senderID
      receiverID
      postID
      sender {
        id
        username
        createdAt
        lastUploadDate
        name
        image
        biography
        n_followers
        n_following
        n_remakes
        updatedAt
      }
      post {
        id
        createdAt
        type
        title
        UpperCaseTitle
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        location
        language
        procedure
        hashtags
        postIngredients {
          quantity
          type
        }
        tip
        originalID
        chefID
        original {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        type
        text
        senderID
        receiverID
        postID
        sender {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        post {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      createdAt
      type
      title
      UpperCaseTitle
      caption
      image
      serves
      cook_time
      rating
      n_likes
      n_comments
      n_tips
      location
      language
      procedure
      hashtags
      postIngredients {
        quantity
        type
      }
      tip
      originalID
      chefID
      original {
        id
        createdAt
        type
        title
        UpperCaseTitle
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        location
        language
        procedure
        hashtags
        postIngredients {
          quantity
          type
        }
        tip
        originalID
        chefID
        original {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      chef {
        id
        username
        createdAt
        lastUploadDate
        name
        image
        biography
        n_followers
        n_following
        n_remakes
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        type
        title
        UpperCaseTitle
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        location
        language
        procedure
        hashtags
        postIngredients {
          quantity
          type
        }
        tip
        originalID
        chefID
        original {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($chefID: ID!, $postID: ID!) {
    getLike(chefID: $chefID, postID: $postID) {
      id
      createdAt
      chefID
      postID
      chef {
        id
        username
        createdAt
        lastUploadDate
        name
        image
        biography
        n_followers
        n_following
        n_remakes
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $chefID: ID
    $postID: ModelIDKeyConditionInput
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLikes(
      chefID: $chefID
      postID: $postID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        createdAt
        chefID
        postID
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSave = /* GraphQL */ `
  query GetSave($postID: ID!, $chefID: ID!) {
    getSave(postID: $postID, chefID: $chefID) {
      id
      createdAt
      chefID
      postID
      post {
        id
        createdAt
        type
        title
        UpperCaseTitle
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        location
        language
        procedure
        hashtags
        postIngredients {
          quantity
          type
        }
        tip
        originalID
        chefID
        original {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listSaves = /* GraphQL */ `
  query ListSaves(
    $postID: ID
    $chefID: ModelIDKeyConditionInput
    $filter: ModelSaveFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSaves(
      postID: $postID
      chefID: $chefID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        createdAt
        chefID
        postID
        post {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      createdAt
      text
      chefID
      postID
      chef {
        id
        username
        createdAt
        lastUploadDate
        name
        image
        biography
        n_followers
        n_following
        n_remakes
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        text
        chefID
        postID
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const chefsByName = /* GraphQL */ `
  query ChefsByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelChefFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chefsByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        createdAt
        lastUploadDate
        name
        image
        biography
        n_followers
        n_following
        n_remakes
        updatedAt
      }
      nextToken
    }
  }
`;
export const chefsByUsername = /* GraphQL */ `
  query ChefsByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelChefFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chefsByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        createdAt
        lastUploadDate
        name
        image
        biography
        n_followers
        n_following
        n_remakes
        updatedAt
      }
      nextToken
    }
  }
`;
export const followsByIdol = /* GraphQL */ `
  query FollowsByIdol(
    $idolID: ID
    $followerID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followsByIdol(
      idolID: $idolID
      followerID: $followerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        followerID
        idolID
        follower {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        idol {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const notificationsByReceiver = /* GraphQL */ `
  query NotificationsByReceiver(
    $receiverID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByReceiver(
      receiverID: $receiverID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        type
        text
        senderID
        receiverID
        postID
        sender {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        post {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const notificationsBySender = /* GraphQL */ `
  query NotificationsBySender(
    $senderID: ID
    $postIDType: ModelNotificationBySenderCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsBySender(
      senderID: $senderID
      postIDType: $postIDType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        type
        text
        senderID
        receiverID
        postID
        sender {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        post {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const notificationsByFollow = /* GraphQL */ `
  query NotificationsByFollow(
    $senderID: ID
    $receiverIDType: ModelNotificationByFollowCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByFollow(
      senderID: $senderID
      receiverIDType: $receiverIDType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        type
        text
        senderID
        receiverID
        postID
        sender {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        post {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByChef = /* GraphQL */ `
  query PostsByChef(
    $chefID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByChef(
      chefID: $chefID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        type
        title
        UpperCaseTitle
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        location
        language
        procedure
        hashtags
        postIngredients {
          quantity
          type
        }
        tip
        originalID
        chefID
        original {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByOriginal = /* GraphQL */ `
  query PostsByOriginal(
    $originalID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByOriginal(
      originalID: $originalID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        type
        title
        UpperCaseTitle
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        location
        language
        procedure
        hashtags
        postIngredients {
          quantity
          type
        }
        tip
        originalID
        chefID
        original {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByTitle = /* GraphQL */ `
  query PostsByTitle(
    $title: String
    $rating: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByTitle(
      title: $title
      rating: $rating
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        type
        title
        UpperCaseTitle
        caption
        image
        serves
        cook_time
        rating
        n_likes
        n_comments
        n_tips
        location
        language
        procedure
        hashtags
        postIngredients {
          quantity
          type
        }
        tip
        originalID
        chefID
        original {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const likesByPost = /* GraphQL */ `
  query LikesByPost(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesByPost(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        chefID
        postID
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const savesByChef = /* GraphQL */ `
  query SavesByChef(
    $chefID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSaveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    savesByChef(
      chefID: $chefID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        chefID
        postID
        post {
          id
          createdAt
          type
          title
          UpperCaseTitle
          caption
          image
          serves
          cook_time
          rating
          n_likes
          n_comments
          n_tips
          location
          language
          procedure
          hashtags
          tip
          originalID
          chefID
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByPost = /* GraphQL */ `
  query CommentsByPost(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPost(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        text
        chefID
        postID
        chef {
          id
          username
          createdAt
          lastUploadDate
          name
          image
          biography
          n_followers
          n_following
          n_remakes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
