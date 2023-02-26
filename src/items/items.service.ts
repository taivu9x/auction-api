import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { StatusEnum, TypeEnum } from '../common/types';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    return await this.itemRepository.findOne({
      where: { id, status: StatusEnum.ACTIVE },
    });
  }

  async create(item: Item): Promise<Item> {
    return await this.itemRepository.save({
      ...item,
      startPrice: item.currentPrice,
    });
  }

  async update(id: number, item: Item): Promise<any> {
    return await this.itemRepository.update(id, item);
  }

  async publishItem(id: number): Promise<any> {
    return await this.itemRepository.update(id, {
      type: TypeEnum.PUBLISH,
      startDate: new Date(),
    });
  }

  async bid(id: number, item: Item): Promise<any> {
    const itemDB = await this.itemRepository.findOne({
      where: { id, status: StatusEnum.ACTIVE },
    });

    if (!itemDB || itemDB.type !== TypeEnum.PUBLISH) {
      throw new Error('Item is not public');
    }

    if (new Date(+itemDB.startDate + itemDB.duration) < new Date()) {
      throw new Error('Item is expired');
    }

    if (itemDB.currentPrice >= item.currentPrice) {
      throw new Error('Current price must be higher than current price');
    }

    return await this.itemRepository.update(id, {
      currentPrice: item.currentPrice,
    });
  }
}
