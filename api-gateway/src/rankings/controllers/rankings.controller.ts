import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';

@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/rankings')
export class RankingsController {
  
  constructor(private readonly clientProxy: ClientProxyProvider) {}

  @Get()
  findAll(@Query('categoryId') categoryId: string, @Query('dateRef') dateRef: string): Observable<any> {
    if(!categoryId) {
      throw new BadRequestException('Category id is required');
    }

    return this.clientProxy.getRankingInstance().send('find-rankings', {categoryId, dateRef });
  }
}
