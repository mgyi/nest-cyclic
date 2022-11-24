import { IsNumber, IsString, IsEnum } from 'class-validator';
import { SIDES } from 'src/utils/enums';

export class HookDto {
  @IsString()
  symbol: string;

  @IsEnum(SIDES)
  side: SIDES;

  @IsNumber()
  quantity: number;

  @IsNumber()
  stopPrice: number;

}
  