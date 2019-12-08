import { Posts } from './posts.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
declare class CleatePostDto {
    title: string;
    content: string;
}
export declare class PostsController {
    private readonly PostsModel;
    constructor(PostsModel: ModelType<Posts>);
    index(): Promise<import("@typegoose/typegoose/lib/types").DocumentType<Posts>[]>;
    create(cleatePostDto: CleatePostDto): Promise<{
        success: boolean;
    }>;
    detail(cid: string): Promise<import("@typegoose/typegoose/lib/types").DocumentType<Posts>>;
    update(cid: string, cleatePostDto: CleatePostDto): Promise<{
        success: boolean;
    }>;
    remove(cid: string): Promise<{
        success: boolean;
    }>;
}
export {};
