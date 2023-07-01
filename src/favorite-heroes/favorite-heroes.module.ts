import { Module } from '@nestjs/common';
import { FavoriteHeroesService } from './favorite-heroes.service';
import { FavoriteHeroesController } from './favorite-heroes.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { FavoriteHeroSchema } from '../@core/infra/db/favorite-hero.schema';
import { FavoriteHeroRepository } from 'src/@core/infra/db/favorite-hero.repository';
import { FavoriteHero } from '../@core/domain/entities/favorite-hero.entity';
import { CreateFavoriteHeroUseCase } from 'src/@core/application/create-favorite-hero.use-case';
import { FavoriteHeroRepositoryInterface } from 'src/@core/domain/repositories/favorite-hero.repository';
import { DeleteFavoriteHeroUseCase } from 'src/@core/application/delete-favorite-hero.use-case';
import { ListAllFavoriteHeroUseCase } from 'src/@core/application/list-all-favorite-hero.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteHeroSchema])],
  controllers: [FavoriteHeroesController],
  providers: [
    FavoriteHeroesService,
    {
      provide: FavoriteHeroRepository,
      useFactory: (dataSource: DataSource) => {
        return new FavoriteHeroRepository(
          dataSource.getRepository(FavoriteHero),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateFavoriteHeroUseCase,
      useFactory: (repository: FavoriteHeroRepositoryInterface) => {
        return new CreateFavoriteHeroUseCase(repository);
      },
      inject: [FavoriteHeroRepository],
    },
    {
      provide: DeleteFavoriteHeroUseCase,
      useFactory: (repository: FavoriteHeroRepositoryInterface) => {
        return new DeleteFavoriteHeroUseCase(repository);
      },
      inject: [FavoriteHeroRepository],
    },
    {
      provide: ListAllFavoriteHeroUseCase,
      useFactory: (repository: FavoriteHeroRepositoryInterface) => {
        return new ListAllFavoriteHeroUseCase(repository);
      },
      inject: [FavoriteHeroRepository],
    },
  ],
})
export class FavoriteHeroesModule {}