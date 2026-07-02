import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("This Field must be an email")
      .required("This Field is Required"),
    password: yup
      .string()
      .min(8, "The min length is 8 characters")
      .required("This Field is Required"),
  })
  .required();

export const signUpSchema = yup
  .object({
    username: yup
      .string()
      .min(3, "The min length is 3 characters")
      .required("This Field is Required"),
    email: yup
      .string()
      .email("This Field must be an email")
      .required("This Field is Required"),
    password: yup
      .string()
      .min(8, "The min length is 8 characters")
      .required("This Field is Required"),
  })
  .required();

export const addAdminShcema = yup
  .object({
    name: yup
      .string()
      .required("This field is required")
      .min(3, "The min number of character is 3"),
    email: yup
      .string()
      .email()
      .required("This field is required")
      .min(5, "The min number of character is 3"),
    password: yup
      .string()
      .min(8, "The min length is 8 characters")
      .required("This Field is Required"),
    role: yup.string().required("This Field is Requiered"),
  })
  .required();

export const editAdminShcema = yup
  .object({
    name: yup
      .string()
      .required("This field is required")
      .min(3, "The min number of character is 3"),
    email: yup
      .string()
      .email()
      .required("This field is required")
      .min(5, "The min number of character is 3"),
    password: yup
      .string()
      .min(8, "The min length is 8 characters")
      .required("This Field is Required"),
  })
  .required();

export const addStudentShcema = yup
  .object({
    name: yup
      .string()
      .required("This field is required")
      .min(3, "The min number of character is 3"),
    email: yup
      .string()
      .email()
      .required("This field is required")
      .min(5, "The min number of character is 3"),
    department: yup
      .string()
      .required("This field is required")
      .min(2, "The min number of character is 3"),
    year: yup.number().required("This field is required"),
    password: yup
      .string()
      .min(8, "The min length is 8 characters")
      .required("This Field is Required"),
  })
  .required();

export const addCourseShcema = yup
  .object({
    coursename: yup
      .string()
      .required("This field is required")
      .min(4, "The minum number of characters is 4 "),
    coursecode: yup.string().required("This field is required"),
    year: yup.number().required("This field is required"),
    department: yup
      .string()
      .required("This field is requierd")
      .min(2, "The minum number of charaters is 2"),
    image: yup
      .mixed<FileList>()
      .test(
        "required",
        "Image is required",
        (value) => value instanceof FileList && value.length > 0,
      )
      .test(
        "fileSize",
        "Max size is 2MB",
        (value) => !value || value[0]?.size <= 2 * 1024 * 1024,
      )
      .test(
        "fileType",
        "Only JPEG, PNG, WEBP allowed",
        (value) =>
          !value ||
          ["image/jpeg", "image/png", "image/webp"].includes(value[0]?.type),
      ),
  })
  .required();

export const editCourseShcema = yup
  .object({
    coursename: yup
      .string()
      .required("This field is required")
      .min(4, "The minum number of characters is 4 "),
    year: yup.number().required("This field is required"),
    department: yup
      .string()
      .required("This field is requierd")
      .min(2, "The minum number of charaters is 2"),
  })
  .required();

export const materialUploadSchema = yup.object({
  courseId: yup.string().required("This field is required"),

  title: yup
    .string()
    .required("This field is required")
    .min(5, "Min number of characters is 5"),

  file: yup
    .mixed<FileList>()
    .test(
      "required",
      "File is required",
      (value) => value instanceof FileList && value.length > 0,
    )
    .test(
      "fileSize",
      "Max size is 5MB",
      (value) =>
        !value || value.length === 0 || value[0].size <= 5 * 1024 * 1024,
    )
    .test(
      "fileType",
      "Only PDF allowed",
      (value) =>
        !value || value.length === 0 || value[0].type === "application/pdf",
    ),
});

export const joinCourseSchema = yup
  .object({
    coursecode: yup.string().required("This field is required"),
  })
  .required();

export const profileEditSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  department: yup.string().default(""),
  year: yup.number().optional(),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export const addDepartmentShcema = yup
  .object({
    name: yup
      .string()
      .required("This field is required")
      .min(3, "The min number of character is 3"),
  })
  .required();

export const editQuizShcema = yup
  .object({
    title: yup
      .string()
      .required("This field is required")
      .min(4, "The minum number of characters is 4 "),
    dueDate: yup.string().required("This field is required"),
    timeLimit: yup
      .number()
      .required("This field is required")
      .min(5, "The minmin number of minutes is 5 "),
    status: yup
      .string()
      .required("This field is requierd")
      .min(2, "The minum number of charaters is 2"),
  })
  .required();

export const addQuizShcema = yup
  .object({
    title: yup
      .string()
      .required("This field is required")
      .min(4, "The minum number of characters is 4 "),
    duedate: yup.string().required("This field is required"),
    selectcourse: yup.string().required("This field is required"),
    quesnum: yup.number().required("This field is required"),

    timelimit: yup
      .number()
      .required("This field is required")
      .min(5, "The minmin number of minutes is 5 "),
  })
  .required();

export const addQuestuinsShcema = yup
  .object({
    question: yup.string().required("This field is requierd"),
    opt1: yup.string().required("This field is requierd"),
    opt2: yup.string().required("This field is requierd"),
    opt3: yup.string().required("This field is requierd"),
    opt4: yup.string().required("This field is requierd"),
    answer: yup.string().required("This field is requierd"),
    questionnum: yup.number().required("This field is required"),
    points: yup.number().required("This field is required"),
  })
  .required();

export const addTaskShcema = yup
  .object({
    title: yup
      .string()
      .required("This field is required")
      .min(4, "The minum number of characters is 4 "),
    dueDate: yup.string().required("This field is required"),
    courseId: yup.string().required("This field is required"),
    description: yup.string().required("This field is required"),
  })
  .required();

export const editTaskShcema = yup
  .object({
    title: yup
      .string()
      .required("This field is required")
      .min(4, "The minum number of characters is 4 "),
    duedate: yup.string().required("This field is required"),
    description: yup.string().required("This field is required"),
  })
  .required();

export const viewTaskShcema = yup
  .object({
    message: yup
      .string()
      .required("This field is required")
      .min(4, "The minum number of characters is 4 "),
  })
  .required();

export const taskUploadSchema = yup
  .object({
    submittedText: yup.string().required("This field is Required"),

    file: yup
      .mixed<FileList>()
      .nullable()
      .test(
        "fileSize",
        "Max size is 5MB",
        (value) =>
          !value || value.length === 0 || value[0]?.size <= 5 * 1024 * 1024,
      )
      .test(
        "fileType",
        "Only PDF allowed",
        (value) =>
          !value || value.length === 0 || value[0]?.type === "application/pdf",
      ),
  })
  .test("atLeastOne", "Either submitted text or file is required", (value) => {
    return !!(
      value?.submittedText?.trim() ||
      (value?.file && value.file.length > 0)
    );
  });
