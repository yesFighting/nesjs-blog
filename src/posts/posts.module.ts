import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Posts } from './posts.model';

@Module({

  imports: [   //在这里导入模型
    TypegooseModule.forFeature([Posts])   //Posts本来是一个普通类 但是从这里导入后变成了模型
  ],

  controllers: [PostsController]
})
export class PostsModule { }
