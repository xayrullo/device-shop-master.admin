<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div class="space-y-6">
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autocomplete="username"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none px-4 sm:text-sm sm:leading-6"
                :class="
                  errors.username
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus:ring-indigo-600'
                "
                v-model="login.username"
                @input="validateField('username')"
              />
              <div v-if="errors.username" class="text-sm text-red-600">
                {{ errors.username }}
              </div>
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="12345678"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none px-4 sm:text-sm sm:leading-6"
                :class="
                  errors.password
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus:ring-indigo-600'
                "
                v-model="login.password"
                @input="validateField('password')"
              />
              <div v-if="errors.password" class="text-sm text-red-600">
                {{ errors.password }}
              </div>
            </div>
          </div>
          <div v-if="errors.message" class="text-base text-red-600">
            {{ errors.message }}
          </div>
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="onSubmit"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as Yup from "yup";
import { ValidationError } from "yup";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const login = ref({
  username: "kminchelle",
  password: "0lelplR",
});
const errors = ref({
  username: "",
  password: "",
  message: "",
});

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
function validateField(key) {
  validationSchema
    .validateAt(key, login.value)
    .then(() => {
      errors.value[key] = "";
    })
    .catch((error) => {
      errors.value[key] = error.message;
    });
}
async function onSubmit() {
  try {
    await validationSchema.validate(login.value, { abortEarly: false });
    await authStore.login(login.value);
    const response = authStore.response;
    if (response.success) {
      errors.value.message = "";
      router.push("/dashboard");
    } else {
      errors.value.message = response.message;
    }
  } catch (error) {
    if (error instanceof ValidationError)
      error.inner.forEach((err: ValidationError) => {
        errors.value[err.path ?? ""] = err.message;
      });
  }
}
</script>
