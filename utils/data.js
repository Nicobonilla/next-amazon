import bcrypt from 'bcryptjs'

export const data = {
  users: [
    {
      name: 'Jon',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'Jane',
      email: 'noAdmin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false
    },
],
  products: [
    {
      id: 5,
      name: 'ENERGETICA MR BIG',
      slug: 'energetica-mr-big',
      category: 'Bebida Energética',
      urlImage:
        'https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg',
      price: 1490.0,
      brand: 'Mr Big',
      discount: 20,
      rating: 2,
      numReviews: 10,
      countInStock: 20,
      description: 'Bebida energética económica'
    },
    {
      id: 6,
      name: 'ENERGETICA RED BULL',
      slug: 'energetica-red-bull',
      category: 'Bebida Energética',
      urlImage:
        'https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg',
      price: 1490.0,
      brand: 'Red Bull',
      discount: 0,
      rating: 5,
      numReviews: 10,
      countInStock: 20,
      description: 'Bebida energética sin azucar'
    },
    {
      id: 7,
      name: 'ENERGETICA SCORE',
      slug: 'energetica-score',
      category: 'Bebida Energética',
      urlImage:
        'https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png',
      price: 1290.0,
      brand: 'Score',
      discount: 0,
      rating: 3.5,
      numReviews: 10,
      countInStock: 20,
      description: 'La bebida energética más barata'
    },
    {
      id: 8,
      name: 'PISCO ALTO DEL CARMEN 35º',
      slug: 'pisco-alto-del-carmen-35',
      category: 'Alcohol',
      urlImage:
        'https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg',
      price: 7990.0,
      brand: 'Capel',
      discount: 10,
      rating: 3,
      numReviews: 10,
      countInStock: 20,
      description: 'Bebida alcoholica destilada de 35°'
    },
  ],
};

