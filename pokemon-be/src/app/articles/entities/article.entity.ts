import { ApiProperty } from "@nestjs/swagger";
import { Article } from "@prisma/client";

export class ArticleEntity implements Article {
    @ApiProperty()
    public id!: number;
  
    @ApiProperty()
    public title!: string;
  
    @ApiProperty({ required: false, nullable: true, type: 'string' })
    public description!: string | null;
  
    @ApiProperty()
    public body!: string;
  
    @ApiProperty()
    public published!: boolean;
  
    @ApiProperty()
    public createdAt!: Date;
  
    @ApiProperty()
    public updatedAt!: Date;
}
