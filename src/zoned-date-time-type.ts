import { DateTimeFormatter, type ZonedDateTime, convert, nativeJs } from "@js-joda/core";
import { type EntityProperty, type Platform, Type } from "@mikro-orm/core";

export class ZonedDateTimeType extends Type<ZonedDateTime | null, Date | string | null> {
    public convertToDatabaseValue(value: ZonedDateTime | null): Date | null {
        if (!value) {
            return null;
        }

        return convert(value).toDate();
    }

    public convertToJSValue(
        value: Date | string | number | null,
        platform: Platform,
    ): ZonedDateTime | null {
        if (value === null) {
            return null;
        }

        return nativeJs(this.databaseValueToDate(value, platform));
    }

    private databaseValueToDate(value: Date | string | number, platform: Platform): Date {
        if (value instanceof Date) {
            return value;
        }

        const tz = platform.getTimezone();

        if (!tz || tz === "local") {
            return new Date(value);
        }

        if (
            typeof value === "number" ||
            value.includes("+") ||
            value.endsWith("Z") ||
            value.startsWith("z")
        ) {
            return new Date(value);
        }

        return new Date(`${value}${tz}`);
    }

    public override compareAsType(): string {
        return "date";
    }

    public override toJSON(value: ZonedDateTime | null): string | null {
        return value ? value.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME) : null;
    }

    public override getColumnType(prop: EntityProperty, platform: Platform): string {
        return platform.getDateTimeTypeDeclarationSQL({ length: prop.length });
    }
}
