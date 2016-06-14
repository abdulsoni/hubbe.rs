<?php

use Illuminate\Database\Seeder;
use Fundator\ProductCategory;
use Fundator\InnovationCategory;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // Product Categories

        $product_categories = ['Clothing and apparel accessories', 'Electronics Accessories', 'Exercise & Fitness', 'Health & Beauty', 'Household Appliances', 'Indoor Games', 'Kitchen & Dining', 'Lawn & Garden', 'Luggage and Travel accessories', 'Outdoor Recreation', 'Personal Care', 'Pet Supplies', 'Toys', 'Vehicle Parts & Accessories', 'Athletics', 'Beverages', 'Circuit Boards & Components', 'Clothing Accessories', 'Communications', 'Filing & Organization', 'Food Items', 'Hobbies & Creative Arts', 'Household Supplies', 'Linens & Bedding', 'Medical', 'Office Instruments', 'Party & Celebration', 'Photography', 'Plumbing', 'Presentation Supplies', 'Print, Copy, Scan & Fax', 'Retail', 'Science & Laboratory', 'Tools', 'Vehicles', 'Video', 'Weapons'];

        foreach ($product_categories as $category) {
            ProductCategory::create([
                'name' => $category,
                'description' => ''
            ]);
        }

        // Innovation Categories

        $innovation_categories = [
            'Connected' => 'Any kind of new or added function related to wireless communication, wireless functions, IoT...etc',
            'Artistic Design' => 'New visual or shape design, Unusual design for an existing object or function ',
            'Eco friendly' => 'Any function or attribute related to ecological concerns or environment protection ',
            'Low cost' => 'Provide a significant cost reduction solution for existing function or product',
            'Unusual materials' => 'Use existing standard material for an unusual purpose, product or function',
            'New Hitech materials' => 'Use new and special material with enhanced or new functions',
            'New function' => 'Add a new function to an existing product',
            'Gather functions' => 'Put together functions that are not usually related or seen in the same object'
        ];

        foreach ($innovation_categories as $category => $description) {
            InnovationCategory::create([
                'name' => $category,
                'description' => $description
            ]);
        }
    }
}

