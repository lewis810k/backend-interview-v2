import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateFavoriteRequestDto {
  token: string;

  @IsBoolean()
  readonly isFavorite: boolean;

  @IsString()
  readonly targetType: string;

  @IsNumber()
  readonly targetId: number;
}
