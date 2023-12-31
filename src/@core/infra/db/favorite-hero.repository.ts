import { FavoriteHero } from '../../domain/entities/favorite-hero.entity';
import { Repository } from 'typeorm';
import { FavoriteHeroRepositoryInterface } from '../../domain/repositories/favorite-hero.repository';

export class FavoriteHeroRepository implements FavoriteHeroRepositoryInterface {
  constructor(private readonly repository: Repository<FavoriteHero>) {}

  async findAll(): Promise<FavoriteHero[]> {
    return await this.repository.find();
  }

  async favoriteHeroExists(heroId: number): Promise<boolean> {
    const favoritehero = await this.repository.findOneBy({ heroId });
    return !!favoritehero;
  }

  async insert(favoriteHero: FavoriteHero): Promise<FavoriteHero> {
    return await this.repository.save(favoriteHero);
  }

  async delete(heroId: number): Promise<boolean> {
    const result = await this.repository.delete({ heroId });
    return result.affected === 1;
  }
}
