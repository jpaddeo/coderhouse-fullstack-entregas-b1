import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
    default: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  categories: {
    type: Array,
    require: true,
    default: [],
  },
  thumbnails: {
    type: Array,
    require: false,
    default: [],
  },
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
