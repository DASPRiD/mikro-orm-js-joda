# JS Joda for Mikro ORM

[![Release](https://github.com/DASPRiD/mikro-orm-js-joda/actions/workflows/release.yml/badge.svg)](https://github.com/DASPRiD/mikro-orm-js-joda/actions/workflows/release.yml)

This package provides [Mikro ORM](https://github.com/mikro-orm/mikro-orm) types for common 
[JS Joda](https://github.com/js-joda/js-joda) objects.

The library exports the following types:

- `LocalDateType`
- `LocalTimeType`
- `ZonedDateTimeType`

It is not handling `LocalDateTime` at the moment, as that type is very platform dependent and Mikro ORM does not come
with a declaration in its platform drivers.

## Supported peer dependencies

At the moment, you need to have a recent version of `@js-joda/core^5.6.1` and `@mikro-orm/core@^6.0.5`. Support for
future major releases will be added as needed.

## Installation

### npm
```bash
npm i mikro-orm-js-joda
```

### pnpm
```bash
pnpm add mikro-orm-js-joda
```

## Usage

```typescript
import type { ZonedDateTime } from '@js-joda/core';
import { ZonedDateTimeType } from 'mikro-orm-js-joda';
import { Entity, Property } from "@mikro-orm/core";

@Entity()
export class HelloWorld {
    @Property({type: ZonedDateTimeType})
    public dateTime: ZonedDateTime;
}

```
