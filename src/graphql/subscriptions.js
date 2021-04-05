/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChef = /* GraphQL */ `
  subscription OnCreateChef {
    onCreateChef {
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
export const onUpdateChef = /* GraphQL */ `
  subscription OnUpdateChef {
    onUpdateChef {
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
export const onDeleteChef = /* GraphQL */ `
  subscription OnDeleteChef {
    onDeleteChef {
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
export const onCreateFollow = /* GraphQL */ `
  subscription OnCreateFollow {
    onCreateFollow {
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
export const onUpdateFollow = /* GraphQL */ `
  subscription OnUpdateFollow {
    onUpdateFollow {
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
export const onDeleteFollow = /* GraphQL */ `
  subscription OnDeleteFollow {
    onDeleteFollow {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
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
export const onCreateSave = /* GraphQL */ `
  subscription OnCreateSave {
    onCreateSave {
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
export const onUpdateSave = /* GraphQL */ `
  subscription OnUpdateSave {
    onUpdateSave {
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
export const onDeleteSave = /* GraphQL */ `
  subscription OnDeleteSave {
    onDeleteSave {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
