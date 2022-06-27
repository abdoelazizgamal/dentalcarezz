export const categories = [
  {
    name: 'General Dentist',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    name: 'Pedodontist',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWOWlMDG6aE5H-ILUMU8Kfx67B6xON6LIc3Q&usqp=CAU',
  },
  {
    name: 'orthodontist',
    image: 'https://media.istockphoto.com/photos/orthodontist-placing-rubber-bands-on-female-patient-braces-picture-id1293534212?k=20&m=1293534212&s=612x612&w=0&h=4eeJeOoAP0wyVZiwj4zdS6mQsEz7y6L0xCzWZQtRb5I=',
  },
  {
    name: 'Periodontist',
    image: 'https://pascackdental.com/wp-content/uploads/2021/05/What-is-a-periodontist-and-when-to-see-one.jpg',
  },
  {
    name: 'Endodontist',
    image: 'http://qcendo.tdocloud.com/wp-content/uploads/2018/07/3D-Tooth..jpg',
  },
  {
    name: 'Oral Pathologist',
    image: 'https://media.careersinthemilitary.com/citm-images/0044.06.jpg',
  },
  {
    name: 'Prosthodontist',
    image: 'https://qph.fs.quoracdn.net/main-qimg-d7581352e365bfc41e1b1d55eecc03d0-lq',
  },

];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};