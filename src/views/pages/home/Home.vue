<template>
  <AppResponsive>
    <ModeSelect />
    <StatisticCard />
  </AppResponsive>
</template>

<script>
import ModeSelect from "@/views/pages/home/ModeSelect";
import StatisticCard from "@/views/pages/home/StatisticCard";
import AppResponsive from "@/components/AppResponsive";

export default {
  name: "Home",
  components: { AppResponsive, StatisticCard, ModeSelect }
};
</script>
