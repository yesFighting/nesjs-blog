import { Controller, Get, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiMovedPermanentlyResponse, ApiProperty } from '@nestjs/swagger';
// import { PostsModel } from './posts.model';  //已弃
import { IsNotEmpty } from 'class-validator'//校验
import { InjectModel } from 'nestjs-typegoose';
import { Posts } from './posts.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { Crud } from 'nestjs-mongoose-crud'  //快速实现增删改查

//数据传输对象   类型约束
class CleatePostDto {

  @ApiProperty({ description: '帖子标题', example: '帖子详情1' })
  @IsNotEmpty({ message: "请填写标题" })   //校验
  title: string

  @ApiProperty({ description: '帖子内容' })
  content: string

}


// @Crud({   //快速实现增删改查
//   model: Posts
// })

@Controller('posts')
@ApiTags('帖子')
export class PostsController {

  constructor(
    @InjectModel(Posts) private readonly PostsModel: ModelType<Posts>   //PostsModel： Posts模型定义的名字  ModelType<Posts>指定一个模型类增加静态类型提示
  ) { }   //nest底层解析找到posts这个类 然后new一下赋值给PostsModel


  @Get()
  @ApiOperation({ summary: "显示博客列表" })
  async index() {
    return await this.PostsModel.find()
  }


  @Post()
  @ApiOperation({ summary: "创建帖子" })
  //@Query() query, @Param() params
  async create(@Body() cleatePostDto: CleatePostDto) {   //装饰器永远不能单独存在 存在一定是为了表述某个东西  cleatePostDto =req.cleatePostDto 这个相当于参数装饰器
    await this.PostsModel.create(cleatePostDto)         //把模型数据翻入curd中
    return {
      success: true
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '博客详情' })

  async detail(@Param('id') cid: string) {   //  @Param('id')获取url的id
    const cont = await this.PostsModel.findById(cid)
    return cont
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })

  async update(@Param('id') cid: string, @Body() cleatePostDto: CleatePostDto) {
    await this.PostsModel.findByIdAndUpdate(cid, cleatePostDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') cid: string) {
    await this.PostsModel.findByIdAndDelete(cid)
    return {
      success: true
    }
  }

}
