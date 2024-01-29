import { ZonedDateTime, convert, nativeJs } from "@js-joda/core";
import { type EntityProperty, type Platform, Type } from "@mikro-orm/core";

export class ZonedDateTimeType extends Type<ZonedDateTime | null, Date | null> {
    public convertToDatabaseValue(value: ZonedDateTime | Date | null): Date | null {
        if (!value) {
            return null;
        }

        if (value instanceof Date) {
            return value;
        }

        return convert(value).toDate();
    }

    public convertToJSValue(value: ZonedDateTime | Date | null): ZonedDateTime | null {
        if (!value) {
            return null;
        }

        if (value instanceof ZonedDateTime) {
            return value;
        }

        return nativeJs(value);
    }

    public override compareAsType(): string {
        return "date";
    }

    public override getColumnType(prop: EntityProperty, platform: Platform): string {
        return platform.getDateTimeTypeDeclarationSQL({ length: prop.length });
    }
}
