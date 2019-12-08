/**
 * 数据模型
 */
import { prop } from '@typegoose/typegoose'

export class Posts {
  @prop()  //表述字段定义
  title: string

  @prop()  //表述字段定义
  content: string

}

// export const PostsModel = getModelForClass(Posts)  //getModelForClass模块方法  