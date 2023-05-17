import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleDto {
    @ApiProperty()
    public title!: string;
  
    @ApiProperty({ required: false })
    public description?: string;
  
    @ApiProperty()
    public body!: string;
  
    @ApiProperty({ required: false, default: false })
    public published?: boolean = false;
}
