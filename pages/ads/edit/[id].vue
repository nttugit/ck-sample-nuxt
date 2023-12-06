<template>
  <ClientOnly>
    <Vueform
      :endpoint="(x, el) => handleSubmit(x, el)"
      v-model="form"
      ref="form"
      sync
    >
      <TextElement name="title" label="Title" :rules="['required']" />

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

      <RadiogroupElement
        name="ads_status"
        :items="[
          {
            value: 0,
            label: 'Ẩn',
          },
          {
            value: 1,
            label: 'HIển thị',
          },
        ]"
        label="Trạng thái"
        :rules="['required']"
      />
      <ButtonElement
        name="submit"
        add-class="mt-2"
        submits
        button-label="Cập nhật"
      />
    </Vueform>
  </ClientOnly>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "UpdateAds",
  data() {
    return {
      ads: {},
      form: {},
      adsLocationOptions: [],
      billboardTypeOptions: [],
    };
  },
  mounted() {
    this.loadAdsData();
    this.loadAdsLocations();
    this.loadBillboardTypes();
  },
  methods: {
    async handleSubmit(form, el$) {
      try {
        const updateAdsAPI = `http://localhost:3000/ads/${this.ads.ads_id}`;
        form.forEach((value, key) => {
          console.log(key, " - ", value);
        });

        // Lấy dữ liệu từ form
        const formData = form;
        const submitData = {};
        formData.forEach((value, key) => {
          submitData[key] = value;
        });

        const response = await axios.patch(updateAdsAPI, submitData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        window.alert("Cập nhật thành công");
        // window.location.reload();
        this.$router.push("/ads");
      } catch (error) {
        console.log("error", error);
      }
    },

    async loadAdsData() {
      try {
        const route = useRoute();
        const adsId = route.params.id;
        const adsAPI = `http://localhost:3000/ads/${adsId}`;
        const response = await axios.get(adsAPI);
        this.ads = response.data;

        // Load dữ liệu lên form (sync data)
        this.form = {
          ...response.data,
          start_date: this.formatDate(response.data.start_date),
          end_date: this.formatDate(response.data.end_date),
        };

        console.log({
          ...response.data,
          start_date: this.formatDate(response.data.start_date),
          end_date: this.formatDate(response.data.end_date),
        });
      } catch (e) {
        console.error("Error fetching data:", e);
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

    formatDate(mysqlDatetime) {
      // Create a new Date object from the MySQL datetime string
      const date = new Date(mysqlDatetime);

      // Get the individual components of the date
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();

      // Use template literals to format the date as "dd-MM-YYYY"
      // const formattedDate = `${day}-${
      //   month < 10 ? "0" + month : month
      // }-${year}`;
      const formattedDate = `${year}-${
        month < 10 ? "0" + month : month
      }-${day}`;
      return formattedDate;
    },
  },
};
</script>

<style></style>
