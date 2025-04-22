import {Controller, Get, Post, Patch, Delete, Param, Body} from '@nestjs/common';
import {RestaurantsService} from './restaurants.service';
import {Restaurant} from './restaurants.model';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post('create')
  async createRestaurant(@Body() restaurantData: Restaurant): Promise<Restaurant> {
    return this.restaurantsService.createRestaurant(restaurantData);
  }

  @Post(':id/menu')
  async addMenuToRestaurant(@Param('id') id: string,
                            @Body('menu') menu: { [key: string]: number }):
    Promise<Restaurant | undefined> {
    return this.restaurantsService.addMenuToRestaurant(Number(id), menu);
  }

  @Post(':id/menu/item')
  async addMenuItemToRestaurant(@Param('id') id: string,
                                @Body('itemName') itemName: string,
                                @Body('price') price: number):
    Promise<Restaurant | undefined> {
    return this.restaurantsService.addMenuItemToRestaurant(Number(id), itemName, price);
  }

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.getAllRestaurants();
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: string):
    Promise<Restaurant | undefined> {
    return this.restaurantsService.getRestaurantById(Number(id));
  }

  @Get(':id/menu')
  async getRestaurantMenu(@Param('id') id: string):
    Promise<Restaurant['menu'] | undefined> {
    return this.restaurantsService.getRestaurantMenu(Number(id));
  }

  @Patch(':id')
  async updateRestaurant(@Param('id') id: string,
                         @Body() restaurantData: Partial<Omit<Restaurant,'id'>>):
    Promise<Restaurant | undefined> {
    return this.restaurantsService.updateRestaurant(Number(id), restaurantData);
  }

  @Delete(':id')
  async deleteRestaurantById(@Param('id') id: string):
    Promise<Restaurant[] | null> {
    return this.restaurantsService.deleteRestaurantById(Number(id));
  }
}