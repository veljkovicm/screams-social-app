let db = {
  users: [
    {
      userId: '76345njkdbfshfgs',
      email: 'user@email.com',
      handle: 'user',
      createdAt: '2020-08-07T07:47:47.105Z',
      imageUrl: 'image/gjkasddad/adasdasd',
      bio: 'Hello, my name is user, nice to meet you',
      website: 'https://user.com',
      location: 'London, UK'
    }
  ],
  screams: [
    {
      userHandle: 'user',
      body: 'this this the scream body',
      createdAt: '2020-08-07T07:47:47.105Z',
      likeCount: 5,
      commentCount: 2
    }
  ],
  notifications: [
    {
      recipient: 'user',
      sender: 'john',
      read: 'true | false',
      screamId: '345tsdfg566455n6j564',
      type: 'like | comment',
      createdAt: '2020-08-07T07:47:47.105Z',
    }
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: '345tsdfg566455n6j564',
      body: 'Noice!',
      createdAt: '2020-08-07T07:47:47.105Z',
    }
  ]
};
const userDetails = {
  // Redux data
  credentials: {
    userId: '76345njkdbfshfgs',
      email: 'user@email.com',
      handle: 'user',
      createdAt: '2020-08-07T07:47:47.105Z',
      imageUrl: 'image/gjkasddad/adasdasd',
      bio: 'Hello, my name is user, nice to meet you',
      website: 'https://user.com',
      location: 'London, UK',
  },
  likes: [
    {
      userHandle: 'user',
      screamId: '345tsdfg566455n6j564'
    },
    {
      userHandle: 'use2',
      screamId: '345tsdfg566455n6j564'
    },
  ]
}