import Kennels from '../models/kennels';
import ImageViews from '../views/imagesViews';

export default {

  render(kennels:Kennels){
    return {
      id:kennels.id,
      name:kennels.name,
      latitude:kennels.latitude,
      longitude:kennels.longitude,
      about:kennels.about,
      instructions:kennels.instructions,
      opening_hours:kennels.opening_hours,
      open_on_weekends:kennels.open_on_weekends,
      images:ImageViews.renderMany(kennels.images)
    }
  },

  renderMany(kennels:Kennels[]){
    return kennels.map(kennel=>{
      this.render(kennel)
    })
  }
}