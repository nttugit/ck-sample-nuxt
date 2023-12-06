<template>
  <ClientOnly>
    <Vueform
      :endpoint="(x, el) => handleSubmit(x, el)"
      v-model="form"
      ref="form"
    >
      <TextElement name="title" label="Tiêu đề" :rules="['required']" />
      <!-- <EditorElement
        name="content"
        label="Nội dung quảng cáo"
        :rules="['required']"
      /> -->
      <TextareaElement name="content" label="Nội dung" :rules="['required']" />

      <SelectElement
        name="billboard_type"
        :items="billboardTypeOptions"
        :search="true"
        :native="false"
        label="Loại bảng quảng cáo"
        input-type="search"
        autocomplete="off"
      />
      <SelectElement
        name="ads_location"
        :items="adsLocationOptions"
        :search="true"
        :native="false"
        label="Điểm đặt quảng cáo"
        input-type="search"
        autocomplete="off"
      />
      <!-- <LocationElement name="location" label="Location" /> -->
      <DateElement
        name="start_date"
        label="Ngày bắt đầu"
        :rules="['required', 'before:end_date']"
      />
      <DateElement
        name="end_date"
        label="Ngày kết thúc"
        :rules="['after:start_date']"
      />
      <TextElement
        name="height"
        input-type="number"
        :rules="['nullable', 'required', 'numeric']"
        autocomplete="off"
        label="Chiều dài (cm)"
      />
      <TextElement
        name="width"
        input-type="number"
        :rules="['nullable', 'required', 'numeric']"
        autocomplete="off"
        label="Chiều rộng (cm)"
      />
      <TextElement
        name="price"
        input-type="number"
        :rules="['nullable', 'required', 'numeric']"
        autocomplete="off"
        label="Giá tiền (đ)"
      />
      <!-- <MultifileElement
        name="images"
        label="Hình ảnh"
        view="gallery"
        accept="image/*"
        :file="{
          rules: [
            'mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/tiff',
          ],
        }"
        :upload-temp-endpoint="handleUpload"
        :urls="{}"
        :drop="true"
        :rules="['required', 'min:1', 'max:5']"
        preview-url="/"
        :auto="false"
      /> -->
      <RadiogroupElement
        name="ads_status"
        :items="[
          {
            value: '0',
            label: 'Ẩn',
          },
          {
            value: '1',
            label: 'HIển thị',
          },
        ]"
        label="Trạng thái"
        :rules="['required']"
      />
      <!-- <ButtonElement name="submitBtn" button-label="Tạo" :submits="true" /> -->
      <ButtonElement
        name="submit"
        add-class="mt-2"
        submits
        button-label="Tạo"
      />
    </Vueform>
  </ClientOnly>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateAds",
  data() {
    return {
      form: {},
      // Danh sách các địa điểm đặt biển quảng cáo, thường sẽ chọn từ bản đồ
      adsLocationOptions: [],
      // Danh sách các loại bảng quảng cáo
      billboardTypeOptions: [],
    };
  },
  mounted() {
    this.loadAdsLocations();
    this.loadBillboardTypes();
  },
  methods: {
    async handleSubmit(form, el$) {
      try {
        const formData = form;
        const images = [];

        // Kiểm tra dữ liệu từ form
        const submitData = {};
        formData.forEach((value, key) => {
          submitData[key] = value;
        });
        console.log("submitData:", submitData);

        const response = await axios.post(
          "http://localhost:3000/ads",
          submitData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);

        this.form = [];
        window.alert("Tao quang cao thanh cong");
        // window.location.reload();
        this.$router.push("/ads");
      } catch (error) {
        console.log("error", error);
      }
    },

    handleUpload(file) {
      return {
        tmp: "ads",
        file,
      };
    },

    async loadAdsLocations() {
      try {
        const adsLocationsAPI = "http://localhost:3000/ads-locations";
        const response = await axios.get(adsLocationsAPI);
        this.adsLocationOptions = response.data.map((location) => ({
          value: location.ads_location_id,
          label:
            location.address +
            "(" +
            location?.lat +
            ", " +
            location?.long +
            ")",
        }));
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    },

    async loadBillboardTypes() {
      try {
        const billboardTypeAPI = "http://localhost:3000/billboard-types";
        const response = await axios.get(billboardTypeAPI);
        this.billboardTypeOptions = response.data.map((item) => ({
          value: item.billboard_type_id,
          label: item.billboard_type_name,
        }));
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    },
  },
};
</script>

<style>
.form-wrapper {
  width: 90%;
  margin: auto;
}
</style>
