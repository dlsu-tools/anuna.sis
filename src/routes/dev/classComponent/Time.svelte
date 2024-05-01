<script lang="ts">
    export let isFiller: boolean = false;
    export let time: Date;

    const data = {
        hour: "00",
        minute: "00",
        m: "",
    };

    if (time >= new Date(0, 0, 0, 13, 0)) {
        data.hour = (time.getHours() - 12).toString().padStart(2, "0");
        data.m = "pm";
    } else if (time < new Date(0, 0, 0, 12, 0)) {
        data.hour = time.getHours().toString().padStart(2, "0");
        data.m = "am";
    } else if (!isFiller) {
        data.hour = "12";
        data.m = "pm";
    }

    if (!isFiller) data.minute = time.getMinutes().toString().padStart(2, "0");
</script>

<div class="flex font-geistMono gap-1">
    <p
        class="text-3xl"
        class:text-white={data.hour != "00"}
        class:text-slate-600={data.hour == "00"}
    >
        {data.hour}:{data.minute}
    </p>
    <div class="flex flex-col mt-0.5">
        <p
            class="leading-none"
            class:text-white={data.m == "am"}
            class:text-slate-600={data.m != "am"}
        >
            am
        </p>
        <p
            class="leading-none"
            class:text-white={data.m == "pm"}
            class:text-slate-600={data.m != "pm"}
        >
            pm
        </p>
    </div>
</div>
