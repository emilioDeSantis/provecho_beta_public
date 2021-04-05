/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChef = /* GraphQL */ `
  mutation CreateChef(
    $input: CreateChefInput!
    $condition: ModelChefConditionInput
  ) {
    createChef(input: $input, condition: $condition) {
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
export const updateChef = /* GraphQL */ `
  mutation UpdateChef(
    $input: UpdateChefInput!
    $condition: ModelChefConditionInput
  ) {
    updateChef(input: $input, condition: $condition) {
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
export const deleteChef = /* GraphQL */ `
  mutation DeleteChef(
    $input: DeleteChefInput!
    $condition: ModelChefConditionInput
  ) {
    deleteChef(input: $input, condition: $condition) {
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
export const createFollow = /* GraphQL */ `
  mutation CreateFollow(
    $input: CreateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    createFollow(input: $input, condition: $condition) {
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
export const updateFollow = /* GraphQL */ `
  mutation UpdateFollow(
    $input: UpdateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    updateFollow(input: $input, condition: $condition) {
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
export const deleteFollow = /* GraphQL */ `
  mutation DeleteFollow(
    $input: DeleteFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    deleteFollow(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
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
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
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
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
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
export const createSave = /* GraphQL */ `
  mutation CreateSave(
    $input: CreateSaveInput!
    $condition: ModelSaveConditionInput
  ) {
    createSave(input: $input, condition: $condition) {
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
export const updateSave = /* GraphQL */ `
  mutation UpdateSave(
    $input: UpdateSaveInput!
    $condition: ModelSaveConditionInput
  ) {
    updateSave(input: $input, condition: $condition) {
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
export const deleteSave = /* GraphQL */ `
  mutation DeleteSave(
    $input: DeleteSaveInput!
    $condition: ModelSaveConditionInput
  ) {
    deleteSave(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
