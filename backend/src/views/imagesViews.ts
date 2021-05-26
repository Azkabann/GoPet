import Images from '../models/images';

export default {
  render(images:Images){
    return {
      id:images.id,
      path:`http://localhost:3535/uploads/${images.path}`
    }
  },

  renderMany(images:Images[]){
    return images.map(image=>{this.render(image)});
  }
}