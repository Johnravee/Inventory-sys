# Inventory Management System

This repository contains SQL scripts for creating tables for an inventory management system using MySQL.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## Introduction

The Inventory Management System is designed to manage product inventory, customer information, orders, suppliers, and categories within a business. It provides a structured database schema to streamline inventory-related operations.

## Features

- **Product Management**: Track product details including name, image, category, stocks, price, and status.
- **Customer Management**: Maintain customer information such as name, email, and contact details.
- **Order Management**: Record and manage orders, including ordered products, quantities, billing details, and timestamps.
- **Supplier Management**: Store supplier information including name, email, contact, address, and status.
- **Category Management**: Categorize products for better organization and searchability.

## Technologies Used

- **Database**: MySQL
- **Front-end**: React with Bootstrap
- **Back-end**: Node.js with Express framework
- **Authentication**: JWT Cookie

## Installation

- Clone the repository.
- Create a MySQL database named `inventory`.
- Copy and execute the SQL scripts provided in each table section to create the necessary tables in the `inventory` database.
- Configure the database connection settings in your application.

## Database Tables

```sql
--Table: `accounts`
CREATE TABLE `accounts` (
  `id` bigint(20) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_email_unique` (`email`)
)

--Table: `category`

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `Category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category` (`Category`),
  KEY `id` (`id`),
  KEY `Category_2` (`Category`)
)
--Table: `customers`

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `contact` (`contact`)
)

--Table: `orders`

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer` varchar(100) NOT NULL,
  `ordered_product` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `qty` int(11) NOT NULL,
  `bill_num` varchar(255) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
)

--Table: `product_list`

CREATE TABLE `product_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` longblob NOT NULL,
  `category` varchar(255) NOT NULL,
  `stocks` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_list_name_unique` (`name`),
  KEY `id` (`id`)
)

--Table: `suppliers`

CREATE TABLE `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
)

```

This README format now includes the database name "inventory" in the installation instructions and provides structured information about each database table. Adjustments can still be made based on your specific project requirements and additional details you want to include.
