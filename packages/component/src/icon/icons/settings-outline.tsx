import React, { FC } from "react";
import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const SettingsOutlineIcon: FC<IconProps> = (props) => {
  const { size = 20, viewBox, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox={`0 0 20 20`}
      {...rest}
    >
      <path d="M6.79071 5.02513L6.60323 5.75132V5.75132L6.79071 5.02513ZM7.29633 4.73321L8.01897 4.93394L7.29633 4.73321ZM4.08719 10.2919L4.62235 10.8174L4.08719 10.2919ZM4.08719 9.70808L4.62235 9.18262L4.08719 9.70808ZM7.29633 15.2668L6.57369 15.4675L7.29633 15.2668ZM6.79071 14.9749L6.60323 14.2487H6.60323L6.79071 14.9749ZM13.2093 14.9748L13.0218 15.701L13.2093 14.9748ZM12.7037 15.2667L13.4263 15.4674L12.7037 15.2667ZM15.9132 9.70808L16.4483 10.2335L15.9132 9.70808ZM15.9132 10.2919L16.4483 9.76647L15.9132 10.2919ZM12.7037 4.73329L13.4263 4.53256V4.53256L12.7037 4.73329ZM13.2093 5.02521L13.0218 4.29902L13.2093 5.02521ZM4.3883 4.72005L3.73878 4.34505L4.3883 4.72005ZM2.62167 12.2201L1.97215 12.5951L2.62167 12.2201ZM2.6852 11.7198L3.22036 12.2453L2.6852 11.7198ZM4.8533 15.4751L4.66582 14.7489L4.8533 15.4751ZM4.3883 15.28L3.73878 15.655L4.3883 15.28ZM7.8319 17.1949L8.55454 16.9941L7.8319 17.1949ZM12.1681 17.1949L12.8907 17.3956L12.1681 17.1949ZM15.612 15.28L16.2616 15.655L15.612 15.28ZM15.147 15.4751L14.9596 16.2012L15.147 15.4751ZM17.3151 11.7198L17.8503 11.1943L17.3151 11.7198ZM17.3787 12.2201L16.7292 11.8451L17.3787 12.2201ZM17.3787 7.77995L18.0282 7.40495L17.3787 7.77995ZM17.3151 8.2802L16.78 7.75475L17.3151 8.2802ZM15.612 4.72006L16.2616 4.34506L15.612 4.72006ZM7.8319 2.80515L8.55454 3.00588L7.8319 2.80515ZM12.1681 2.80515L12.8907 2.60442V2.60442L12.1681 2.80515ZM11.7666 1.75H8.23337V3.25H11.7666V1.75ZM13.4263 4.53256L12.8907 2.60442L11.4455 3.00588L11.9811 4.93402L13.4263 4.53256ZM14.9596 3.79876L13.0218 4.29902L13.3968 5.7514L15.3345 5.25114L14.9596 3.79876ZM18.0282 7.40495L16.2616 4.34506L14.9625 5.09505L16.7292 8.15495L18.0282 7.40495ZM16.4483 10.2335L17.8503 8.80566L16.78 7.75475L15.378 9.18262L16.4483 10.2335ZM15.378 10.8174L16.78 12.2453L17.8503 11.1943L16.4483 9.76647L15.378 10.8174ZM16.7292 11.8451L14.9625 14.905L16.2616 15.655L18.0282 12.5951L16.7292 11.8451ZM15.3345 14.7489L13.3968 14.2486L13.0218 15.701L14.9596 16.2012L15.3345 14.7489ZM12.8907 17.3956L13.4263 15.4674L11.9811 15.066L11.4455 16.9941L12.8907 17.3956ZM8.23337 18.25H11.7666V16.75H8.23337V18.25ZM6.57369 15.4675L7.10927 17.3956L8.55454 16.9941L8.01897 15.0661L6.57369 15.4675ZM5.04077 16.2012L6.97819 15.7011L6.60323 14.2487L4.66582 14.7489L5.04077 16.2012ZM1.97215 12.5951L3.73878 15.655L5.03782 14.905L3.27118 11.8451L1.97215 12.5951ZM3.55203 9.76647L2.15004 11.1943L3.22036 12.2453L4.62235 10.8174L3.55203 9.76647ZM4.62235 9.18262L3.22036 7.75475L2.15004 8.80566L3.55203 10.2335L4.62235 9.18262ZM3.27119 8.15495L5.03782 5.09505L3.73878 4.34505L1.97215 7.40495L3.27119 8.15495ZM4.66582 5.25114L6.60323 5.75132L6.97819 4.29894L5.04078 3.79876L4.66582 5.25114ZM7.10927 2.60442L6.57369 4.53248L8.01897 4.93394L8.55454 3.00588L7.10927 2.60442ZM6.60323 5.75132C7.21905 5.9103 7.84875 5.54675 8.01897 4.93394L6.57369 4.53248C6.62233 4.35739 6.80224 4.25351 6.97819 4.29894L6.60323 5.75132ZM4.62235 10.8174C5.06795 10.3636 5.06795 9.63645 4.62235 9.18262L3.55203 10.2335C3.42472 10.1039 3.42472 9.89613 3.55203 9.76647L4.62235 10.8174ZM8.01897 15.0661C7.84875 14.4533 7.21906 14.0897 6.60323 14.2487L6.97819 15.7011C6.80224 15.7465 6.62233 15.6426 6.57369 15.4675L8.01897 15.0661ZM13.3968 14.2486C12.781 14.0896 12.1513 14.4532 11.9811 15.066L13.4263 15.4674C13.3777 15.6425 13.1978 15.7464 13.0218 15.701L13.3968 14.2486ZM15.378 9.18262C14.9324 9.63645 14.9324 10.3636 15.378 10.8174L16.4483 9.76647C16.5756 9.89613 16.5756 10.1039 16.4483 10.2335L15.378 9.18262ZM11.9811 4.93402C12.1513 5.54683 12.781 5.91039 13.3968 5.7514L13.0218 4.29902C13.1978 4.2536 13.3777 4.35747 13.4263 4.53256L11.9811 4.93402ZM11.75 10C11.75 10.9665 10.9665 11.75 10 11.75V13.25C11.7949 13.25 13.25 11.7949 13.25 10H11.75ZM10 11.75C9.0335 11.75 8.25 10.9665 8.25 10H6.75C6.75 11.7949 8.20508 13.25 10 13.25V11.75ZM8.25 10C8.25 9.0335 9.0335 8.25 10 8.25V6.75C8.20508 6.75 6.75 8.20507 6.75 10H8.25ZM10 8.25C10.9665 8.25 11.75 9.0335 11.75 10H13.25C13.25 8.20507 11.7949 6.75 10 6.75V8.25ZM5.03782 5.09505C4.96295 5.22473 4.8108 5.28857 4.66582 5.25114L5.04078 3.79876C4.53334 3.66775 4.00082 3.89119 3.73878 4.34505L5.03782 5.09505ZM3.22036 7.75475C3.32526 7.86159 3.34605 8.02527 3.27119 8.15495L1.97215 7.40495C1.71011 7.85881 1.78287 8.43171 2.15004 8.80566L3.22036 7.75475ZM3.27118 11.8451C3.34605 11.9747 3.32526 12.1384 3.22036 12.2453L2.15004 11.1943C1.78287 11.5683 1.71011 12.1412 1.97215 12.5951L3.27118 11.8451ZM4.66582 14.7489C4.8108 14.7114 4.96295 14.7753 5.03782 14.905L3.73878 15.655C4.00082 16.1088 4.53334 16.3322 5.04077 16.2012L4.66582 14.7489ZM8.23337 16.75C8.3831 16.75 8.51447 16.8498 8.55454 16.9941L7.10927 17.3956C7.24953 17.9005 7.7093 18.25 8.23337 18.25V16.75ZM11.4455 16.9941C11.4855 16.8498 11.6169 16.75 11.7666 16.75V18.25C12.2907 18.25 12.7505 17.9005 12.8907 17.3956L11.4455 16.9941ZM14.9625 14.905C15.0374 14.7753 15.1895 14.7114 15.3345 14.7489L14.9596 16.2012C15.467 16.3322 15.9995 16.1088 16.2616 15.655L14.9625 14.905ZM16.78 12.2453C16.6751 12.1384 16.6543 11.9747 16.7292 11.8451L18.0282 12.5951C18.2902 12.1412 18.2175 11.5683 17.8503 11.1943L16.78 12.2453ZM16.7292 8.15495C16.6543 8.02527 16.6751 7.86159 16.78 7.75475L17.8503 8.80566C18.2175 8.43171 18.2902 7.85881 18.0282 7.40495L16.7292 8.15495ZM15.3345 5.25114C15.1895 5.28857 15.0374 5.22473 14.9625 5.09505L16.2616 4.34506C15.9995 3.89119 15.467 3.66776 14.9596 3.79876L15.3345 5.25114ZM8.23337 1.75C7.70929 1.75 7.24953 2.09946 7.10927 2.60442L8.55454 3.00588C8.51447 3.15015 8.38311 3.25 8.23337 3.25V1.75ZM11.7666 3.25C11.6169 3.25 11.4855 3.15015 11.4455 3.00588L12.8907 2.60442C12.7505 2.09946 12.2907 1.75 11.7666 1.75V3.25Z" />
    </svg>
  );
};
