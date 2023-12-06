<!-- TodoList.vue -->
<template>
  <div>
    <h2>Todo List</h2>
    <!-- <b-table striped hover :items="todos" :fields="fields">
      <template #cell(actions)="data">
        <b-button @click="updateTodo(data.item.id)" variant="primary"
          >Update</b-button
        >
        <b-button @click="deleteTodo(data.item.id)" variant="danger"
          >Delete</b-button
        >
      </template>
    </b-table> -->

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tiêu đề</th>
          <th scope="col">Kích thước (cm)</th>
          <th scope="col">Thời hạn</th>
          <th scope="col">Giá tiền (đ)</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in adsList" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.width }} x {{ item.height }}</td>
          <td>
            {{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}
          </td>
          <td>{{ item.price }}</td>
          <td>
            <button
              type="button"
              class="btn btn-info"
              @click="updateAds(item.ads_id)"
            >
              Chỉnh sửa
            </button>
            |
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteAds(item.ads_id)"
            >
              Xoá
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adsList: [],
    };
  },
  mounted() {
    this.loadAdsList();
  },
  methods: {
    async loadAdsList() {
      try {
        const response = await fetch("http://localhost:3000/ads");
        const data = await response.json();
        this.adsList = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async updateAds(adsId) {
      // Chuyển sang trang cập nhật
      try {
        this.$router.push("/ads/edit/" + adsId);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },

    async deleteAds(adsId) {
      // Gọi API xoá biển quảng cáo
      try {
        const response = await fetch(`http://localhost:3000/ads/${adsId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          window.alert("Xoá thành công");
          window.location.reload();
        } else {
          console.error("Error deleting todo");
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
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
      const formattedDate = `${day}-${
        month < 10 ? "0" + month : month
      }-${year}`;

      return formattedDate;
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
