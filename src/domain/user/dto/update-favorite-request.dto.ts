import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

export class UpdateFavoriteRequestDto {
  token: string;

  @IsBoolean()
  readonly isFavorite: boolean;

  @IsString()
  @IsEnum(['PRODUCT'])
  readonly targetType: string;

  @IsNumber()
  readonly targetId: number;
}
