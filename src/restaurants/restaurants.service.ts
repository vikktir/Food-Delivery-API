import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurants.model';

@Injectable()
export class RestaurantsService {
  private restaurants: Restaurant[] = [];
  private idCounter = 1;

  async createRestaurant(
    restaurantData: Omit<Restaurant, 'id'>,
  ): Promise<Restaurant> {
    const newRestaurant: Restaurant = {
      id: this.idCounter++,
      ...restaurantData,
    };
    this.restaurants.push(newRestaurant);
    return newRestaurant;
  }

  async addMenuToRestaurant(
    id: number,
    menu: { [key: string]: number },
  ): Promise<Restaurant | undefined> {
    const restaurant = await this.getRestaurantById(id);
    if (!restaurant) return undefined;

    restaurant.menu = menu;
    return restaurant;
  }

  async addMenuItemToRestaurant(
    id: number,
    itemName: string,
    price: number,
  ): Promise<Restaurant | undefined> {
    const restaurant = await this.getRestaurantById(id);
    if (!restaurant) return undefined;

    if (!restaurant.menu) {
      restaurant.menu = {};
    }
    restaurant.menu[itemName] = price;
    return restaurant;
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurants;
  }

  async getRestaurantById(id: number): Promise<Restaurant | undefined> {
    return this.restaurants.find((restaurant) => restaurant.id === id);
  }

  async getRestaurantMenu (id: number): Promise<Restaurant['menu'] | undefined> {
    const restaurant = await this.getRestaurantById(id);
    if (!restaurant) return undefined;
    return restaurant.menu;
  }

  async updateRestaurant(
    id: number,
    restaurantData: Partial<Omit<Restaurant, 'id'>>,
  ): Promise<Restaurant | undefined> {
    const restaurantIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    if (restaurantIndex === -1) return undefined;

    this.restaurants[restaurantIndex] = {
      ...this.restaurants[restaurantIndex],
      ...restaurantData,
    };
    return this.restaurants[restaurantIndex];
  }

  async deleteRestaurantById(id: number): Promise<Restaurant[] | null> {
    const index = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    if (index === -1) {
      return null;
    }
    return this.restaurants.splice(index, 1);
  }
}
